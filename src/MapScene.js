import * as THREE from 'three';
// require orbit controls
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls.js');

export default class MapScene {
  constructor(container, setCountry, showLabel, hideLabel) {
    this.container = container;
    this.setCountry = setCountry;
    this.earthScale = 200;
    this.showLabel = showLabel;
    this.hideLabel = hideLabel;
    this.isRendering = true;

    this.countries = [
      { name: 'Canada', lat: 56.130366, lon: -106.346771 },
      { name: 'United States', lat: 37.09024, lon: -95.712891 },
      { name: 'France', lat: 46.227638, lon: 2.213749 },
      { name: 'Denmark', lat: 56.26392, lon: 9.501785 },
      { name: 'Germany', lat: 51.165691, lon: 10.451526 }
    ]

    this.init();
    this.addLights();
    this.addEarth();
    this.addCountryMarkers();
    this.addRayCasting();
    this.loop();

    window.addEventListener('resize', () => this.handleResize());
  }

  width() {
    return window.innerWidth;
  }

  height() {
    return window.innerHeight;
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, this.width() / this.height(), 1, 2000);
    this.camera.position.z = 500;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    const orbit = new THREE.OrbitControls(this.camera);
    orbit.enableZoom = false;
    orbit.enablePan = false;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width(), this.height());

    this.container.appendChild(this.renderer.domElement);
  }

  addLights() {
    const light = new THREE.AmbientLight(0xFFFFFF, 1);
    this.scene.add(light);
  }

  addMarker(country) {
    let depth = 10;

    const spriteMap = new THREE.TextureLoader().load( "/Marker-80.png" );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    const mesh = new THREE.Sprite( spriteMaterial );
    mesh.name = country.name;
    mesh.scale.set(20, 20, 20);

    // colatitude: difference between latitude and 90 deg
    let phi = (90 - country.lat) * Math.PI / 180;
    // azimuthal: angle (x to z)
    let the = (180 - country.lon) * Math.PI / 180;

    // translate phi & the into XYZ coordinates
    let x = Math.sin(the) * Math.sin(phi) * -1;
    let y = Math.cos(phi);
    let z = Math.cos(the) * Math.sin(phi);

    let pointScale = this.earthScale + (depth / 2);

    mesh.position.set(x * pointScale, y * pointScale, z * pointScale);
    mesh.lookAt(new THREE.Vector3(0, 0, 0));
    this.countryMarkers.add(mesh);
  }


  addEarth() {
    const geometry = new THREE.SphereBufferGeometry(this.earthScale, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('earth.jpg'),
    });
    const mesh = new THREE.Mesh(geometry, material);
    // rotating by 0.5 so that markers show up in the right lat & lon
    mesh.rotation.y += Math.PI / 2;
    this.scene.add(mesh);
    // rotating scene to have Canada centered for user
    this.scene.rotation.y -= Math.PI / 2;
    this.scene.rotation.z -= Math.PI / 6;
  }

  addCountryMarkers() {
    this.countryMarkers = new THREE.Group();

    this.countries.forEach((country) => {
      this.addMarker(country);
    });
    this.scene.add(this.countryMarkers);
  }

  addRayCasting() {
    this.raycaster = new THREE.Raycaster();
    //last position of the mouse
    const mouseVector = new THREE.Vector2();

    this.container.addEventListener('mousemove', (e) => {
      mouseVector.x = 2 * (e.offsetX / this.width()) - 1;
      mouseVector.y = 1 - 2 * ( e.offsetY / this.height() );

      this.updateLabel(e.offsetX, e.offsetY, mouseVector);
    }, false);

    this.container.addEventListener('click', (e) => {
      this.raycaster.setFromCamera( mouseVector.clone(), this.camera );
      const intersects = this.raycaster.intersectObjects( this.countryMarkers.children );
      if (intersects.length > 0) {
        const closest = intersects[0];
        this.setCountry(closest.object.name);
      }
    }, false);
  }

  updateLabel(mouseX, mouseY, mouseVector) {
    this.raycaster.setFromCamera( mouseVector.clone(), this.camera );
    const intersects = this.raycaster.intersectObjects( this.countryMarkers.children );
    if (intersects.length > 0) {
      const closest = intersects[0];
      this.showLabel(mouseX, mouseY, closest.object.name);
    } else {
      this.hideLabel();
    }
  }

  stopRendering() {
    this.isRendering = false;
  }

  handleResize() {
    this.renderer.setSize(this.width(), this.height());
    this.camera.aspect = this.width() / this.height();
    this.camera.updateProjectionMatrix();
  }

  loop() {
    if (!this.isRendering) return;

    this.render();
    requestAnimationFrame(() => {
      this.loop();
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

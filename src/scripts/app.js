import * as THREE from 'three';
// import { Player } from 'vimeo-threejs-player';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples//jsm/renderers/CSS3DRenderer.js';
import Player from '@vimeo/player';
import VideoElement from './videoElement';

export default class Sketch {
  constructor( options ) {
    this.time = 0;
    this.container = options.dom;

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.videos = [];

    console.log( this.width, this.height );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xf0f0f0 );

    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
    this.camera.position.set( 500, 0, 750 );

    this.renderer = new CSS3DRenderer( {
      alpha: true,
    });

    this.currentVideoSet = 'a1';

    this.videoIds = {
      a1: [
        '632282182',
        '632282296',
        '632282467',
        '632282826',
        '632283862',
        '632284238'
      ],
      a2: [
        '632271917',
        '632273673',
        '632275454',
        '632277316',
        '632279030',
        '632280472',
      ],
    };

    this.renderer.setSize( this.width, this.height );
    this.container.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.rotateSpeed = 0.5;

    this.setupListeners();
    this.addObjects();
    this.render();
    this.resize();
  }

  setupListeners() {
    window.addEventListener( 'resize', this.resize.bind( this ) );
    const buttonPlay = document.getElementById('play');
    buttonPlay.addEventListener( 'click', () => {
      this.videos?.map( ( player ) => {
        player.play();
      });
    });

    const buttonPause = document.getElementById('pause');
    buttonPause.addEventListener( 'click', () => {
      this.videos?.map( ( player ) => {
        player.pause();
      });
    });

    const buttonChange = document.getElementById('changeSet');
    buttonChange.addEventListener( 'click', () => {
      this.currentVideoSet = this.currentVideoSet === 'a1' ? 'a2' : 'a1';
      this.videos?.map( ( player, idx ) => {
        player.loadVideo(this.videoIds[this.currentVideoSet][ idx ]);
      });
    });
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize( this.width, this.height );
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    const rotation = Math.PI / 6;
    const group = new THREE.Group();

    const count = 6;
    for ( let i = 0; i < count; i ++ ) {
      let mesh;
      const t = i / count * 2 * Math.PI - Math.PI / count;

      const posX = Math.cos( t ) * 1520;
      const posZ = Math.sin( t ) * 1520;
      // mesh.lookAt(0,0,0);

      const el = new VideoElement( this.videoIds[this.currentVideoSet][ i ], posX, 0, posZ, rotation, `video-${ i }` );

      var player = new Player( el.domEl );

      this.videos.push( player );

      el.object.lookAt( 0, 0, 0 );
      group.add( el.object );
    }

    this.scene.add( group );
  }

  render() {
    this.time += 0.05;
    // this.mesh.rotation.x = this.time / 20;
    // this.mesh.rotation.y = this.time / 10;

    this.renderer.render( this.scene, this.camera );
    window.requestAnimationFrame( this.render.bind( this ) );
  }
}
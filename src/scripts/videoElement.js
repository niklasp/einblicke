import { CSS3DRenderer, CSS3DObject } from 'three/examples//jsm/renderers/CSS3DRenderer.js';

export default class VideoElement {
  constructor( videoId, x, y, z, ry, iframeId ) {

    const div = document.createElement( 'div' );
    div.style.width = '720px';
    div.style.height = '1280px';

    const iframe = document.createElement( 'iframe' );
    iframe.id = iframeId;
    iframe.style.width = '720px';
    iframe.style.height = '1280px';
    iframe.style.background = '#fff';
    div.style.pointerEvents = 'none';

    iframe.src = [ 
      'https://player.vimeo.com/video/', 
      videoId, 
      '?autoplay=1', 
      '&loop=1', 
      '&autopause=0',
      '&title=0',
      '&byline=0',
      '&muted=1',
      '&controls=0',
      '&portrait=0',
    ].join( '' );
    div.appendChild( iframe );

    const object = new CSS3DObject( div );
    object.position.set( x, y, z );
    object.rotation.y = ry;

    return {
      object,
      domEl: iframe
    };
  }
  // <div style="padding:177.78% 0 0 0;position:relative;">
  //<iframe src="https://player.vimeo.com/video/632284238?h=e46f9f3f45&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Kreisgehen06_1.mov"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
};
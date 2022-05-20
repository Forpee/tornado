uniform float uTime;

varying vec2 vUv;

void main()
{
    gl_FragColor=vec4(vUv+mod(uTime,.5),1.,1.);
}
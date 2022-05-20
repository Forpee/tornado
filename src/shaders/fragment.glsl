uniform float uTime;
uniform vec3 color;

varying vec2 vUv;

void main()
{
    // white color
    // vec3 color=color;
    if(vUv.x>mod(uTime,2.)||vUv.x+1.<mod(uTime,2.)){
        discard;
    }
    gl_FragColor=vec4(color,1.);
}
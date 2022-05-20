uniform float uTime;

varying vec2 vUv;

void main()
{
    // white color
    vec3 color=vec3(1.);
    if(vUv.x>mod(uTime,2.)||vUv.x+1.<mod(uTime,2.)){
        discard;
    }
    gl_FragColor=vec4(color,1.);
}
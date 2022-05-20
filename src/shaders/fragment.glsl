uniform float uTime;
uniform vec3 color;

varying vec2 vUv;

void main()
{
    // white color
    // vec3 color=color;
    
    float localProgress=mod(mod(uTime,2.),3.);
    if(vUv.x>localProgress||vUv.x+1.<localProgress){
        discard;
    }
    gl_FragColor=vec4(color,1.);
}
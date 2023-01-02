#version 330 core
layout(location=0) in vec3 pos;
layout(location=1) in vec3 norm;
uniform mat4 mvp;
uniform mat4 mv;
uniform mat4 mv_3x3_it;
uniform mat4 m;
uniform mat4 mnorm;

out vec3 view_pos;
out vec3 view_normal;
out vec3 world_normal;
out vec3 world_pos;

void main()
{
    gl_Position = mvp * vec4(pos, 1.0);

    view_pos = vec3(mv * vec4(pos, 1.0));
    view_normal = vec3(mv_3x3_it * vec4(norm, 1.0));
    world_pos = vec3(m * vec4(pos, 1.0));
    world_normal = vec3(mnorm * vec4(norm, 1.0));

}
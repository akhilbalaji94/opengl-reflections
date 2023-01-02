#version 330 core

in vec3 view_pos;
in vec3 view_normal;
in vec3 world_normal;
in vec3 world_pos;
in vec3 world_view_pos;

uniform vec4 camera_pos;
uniform vec4 light_pos;
uniform samplerCube env;
uniform sampler2D model_reflection;
uniform vec2 reflection_size;

layout(location = 0) out vec3 color;

void main()
{
    vec3 diffuse_color = vec3(0.8, 0.8, 0.8);
    vec3 light_color = vec3(1.0, 1.0, 1.0);
    vec3 ambient_light_color = vec3(0.2, 0.2, 0.2);
    vec3 specular_color = vec3(0.8, 0.8, 0.8);
    float specular_power = 20.0;
    vec3 view_dir = normalize(camera_pos.xyz - world_pos);
    vec3 half_vector = normalize(light_pos.xyz - view_dir.xyz);
    vec3 env_reflect = reflect(-(view_dir), world_normal);

    
    vec3 diffuse_shading = (light_color * clamp(dot(normalize(view_normal), normalize(light_pos.xyz - view_pos)), 0, 1) * diffuse_color);
    vec3 specular_shading = (light_color * pow(clamp(dot(normalize(view_normal), normalize(half_vector)), 0, 1), specular_power) * specular_color);
    vec3 ambient_shading = (ambient_light_color * diffuse_color);

    vec4 object_reflection_color = texture(model_reflection, gl_FragCoord.xy/2/reflection_size);
    vec3 environment_reflection_color = texture(env, env_reflect).rgb;
    vec3 blended_reflection_color = object_reflection_color.a == 1 ? environment_reflection_color : object_reflection_color.rgb;
    // color = (texture(env, env_reflect).rgb)* (diffuse_shading + specular_shading + ambient_shading);
    if (dot(view_dir, world_normal) > 0)
    {
        color = blended_reflection_color * (diffuse_shading + specular_shading + ambient_shading);
        
    }
    else
    {
        color = environment_reflection_color + (diffuse_shading + specular_shading + ambient_shading);
    }
    // color = blended_reflection_color * (diffuse_shading + specular_shading + ambient_shading);
}
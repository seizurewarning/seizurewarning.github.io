---
layout: default
title:  "gmacfx"
permalink: gmacfx-api
---
<link rel="stylesheet" type="text/css" href="{{ "/assets/css/gmacfx-api.css" | relative_url }}">

# gmacfx
## a dead simple scripting language for gmac.
<pre><code class="gmacfx">name: example effect
category: example category 

command: example_gmic_command
params:
integer: int[50]{1...100}
float: float[50.3]{1...100}
boolean: bool[true]
menu: menu[0]{option 0, option 1}
point: point[x,y]
0
1

command: example_next_gmic_command
params:
...</code></pre>
### name
a unique name for your effect.
### category
determines which submenu the effect should be a member of.<br>
gmac has the following built-in categories:
- 3d
- arrays & tiles
- artistic
- blur
- color
- contours
- deformation
- degradation
- lights & shadows
- pattern

if you give your effect a category that does not exist, it will be created.
### command
[any gmic command.](https://gmic.eu/reference/list_of_commands.html)
### params
a command's parameters.
## parameters
### locked
<pre><code class="gmacfx">0,5,2.5</code></pre>
creates no interface.
### numeric
<pre><code class="gmacfx">float[default value]{minimum...maximum}</code></pre>
<pre><code class="gmacfx">int[default value]{minimum...maximum}</code></pre>
creates a slider interface.
### boolean
<pre><code class="gmacfx">bool[default]</code></pre>
creates a toggle interface.
### menu
<pre><code class="gmacfx">menu[default index]{option 0, option 1}</code></pre>
creates a menu interface.
### point
<pre><code class="gmacfx">point[default x value, default y value]</code></pre>
creates a point interface.
> <h3 style="margin-top: 0;"> note on point parameters</h3>
> different gmic commands expect different ranges of values for this pairing. pay close attention to the expected parameter values for each command, for example:
> <pre><code class="gmacfx">light_relief 0.3,0.2,0.2,0,1,50%,50%,5,0.5,0</code></pre>
> <pre><code class="gmacfx">fx_light_relief 0.3,0.2,0.2,0,1,50%,50%,5,0.5,0,0</code></pre>
> [light_relief](https://gmic.eu/reference/light_relief.html) is the built-in relief light command from gmic, and fx_light_relief is a community command 	that adds some extra swag to light_relief.
> the command parameter values are identical(apart from the extra 0 in fx_light_relief, which is a smoothing  parameter), but take a look at the outputs:<br>
>!["lr-fxlr"](/assets/images/gmacfx/lr_fxlr.png)<br>
> it's subtle, but take a closer look at the top-left corner of both images.<br>
> ![comparison](/assets/images/gmacfx/comparison.png)<br>
> light_relief sends the light at the center of the image correctly, while fx_light_relief does not.
> light_relief is expecting values ranging from 0-1, while fx_light_relief is expecting values ranging from 0-100.
> for point parameters ranging 0-100, send:
> <pre><code class="gmacfx">point[default x, default y]</code></pre>
> and for point parameters ranging 0-1, send:
> <pre><code class="gmacfx">point[default x, default y]%</code></pre>

## helpers
### % - normalize

<table class="code-example-table">
    <tr>
        <td><pre><code class="gmacfx">float[0.5]%</code></pre></td>
        <th style="padding: 0.5em;">→</th>
        <td><pre><code class="gmacfx">float[0.5]{0...1}</code></pre></td>
    </tr>
    <tr>
        <td><pre><code class="gmacfx">int[50]%</code></pre></td>
        <th style="padding: 0.5em;">→</th>
        <td><pre><code class="gmacfx">int[50]{0...100}</code></pre></td>
    </tr>
    <tr>
        <td><pre><code class="gmacfx">point[50,50]</code></pre></td>
        <th style="padding: 0.5em;">→</th>
         <td><pre><code class="gmacfx">50,50</code></pre></td>
    </tr>
    <tr>
        <td><pre><code class="gmacfx">point[50,50]%</code></pre></td>
        <th style="padding: 0.5em;">→</th>
        <td><pre><code class="gmacfx">0.5,0.5</code></pre></td>
    </tr>
</table>

### // - comment
<pre><code class="gmacfx">// this is a comment</code></pre>
the effect parser will ignore this line.<br>

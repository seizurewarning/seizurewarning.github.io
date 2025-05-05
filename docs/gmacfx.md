---
layout: default
title:  "gmacfx"
permalink: gmacfx-api
---
<link rel="stylesheet" type="text/css" href="{{ "/assets/css/gmacfx-api.css" | relative_url }}">

# .gmacfx
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
{% include modal.html id="point-params-note" title="note on point parameters" content="note-point-params.html" link_text="note on point parameters" %}
<br>

---
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

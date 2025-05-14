---
layout: default
title:  ".gmacfx"
permalink: gmacfx
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
0,1

command: example_next_gmic_command
params:
...</code></pre>

---

<h3 class="token-keyword-def">name</h3>
a unique name for your effect.
<h3 class="token-keyword-def">category</h3>
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
<h3 class="token-keyword-def">command</h3>
[any gmic command.](https://gmic.eu/reference/list_of_commands.html)
<h3 class="token-keyword-def">params</h3>
a command's parameters.
<hr>
## parameters
<h3 class="token-comment" style="margin-top: 0.5em;">locked</h3>
<pre><code class="gmacfx">0,5,2.5</code></pre>
creates no interface.
<h3>numeric</h3>
<pre><code class="gmacfx">float[default value]{minimum...maximum}</code></pre>
<pre><code class="gmacfx">int[default value]{minimum...maximum}</code></pre>
creates a slider interface.
<h3>boolean</h3>
<pre><code class="gmacfx">bool[default]</code></pre>
creates a toggle interface.
<h3>menu</h3>
<pre><code class="gmacfx">menu[default index]{option 0, option 1}</code></pre>
creates a menu interface.
<h3>point</h3>
<pre><code class="gmacfx">point[default x value, default y value]</code></pre>
creates a point interface.
{% include modal.html id="point-params-note" title="note on point parameters" content="gmacfx/note-point-params.md" link_text="note on point parameters" %}
<hr>
## helpers
<h3 class="token-brackets">%</h3>
normalizes parameters
<table class="code-example-table">
<tr>
<td><pre><code class="gmacfx">float[0.5]%</code></pre></td>
<th style="text-align: center;">→</th>
<td><pre><code class="gmacfx">float[0.5]{0...1}</code></pre></td>
</tr>
<tr>
<td><pre><code class="gmacfx">int[50]%</code></pre></td>
<th style="text-align: center;">→</th>
<td><pre><code class="gmacfx">int[50]{0...100}</code></pre></td>
</tr>
<tr>
<td><pre><code class="gmacfx">point[50,50]</code></pre></td>
<th style="text-align: center;">→</th>
<td><pre><code class="gmacfx">50,50</code></pre></td>
</tr>
<tr>
<td><pre><code class="gmacfx">point[50,50]%</code></pre></td>
<th style="text-align: center;">→</th>
<td><pre><code class="gmacfx">0.5,0.5</code></pre></td>
</tr>
</table>

<h3 class="token-comment">//</h3>
<pre><code class="gmacfx">// this is a comment</code></pre>

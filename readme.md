# VAST content-roll player

Show video content-roll from VAST source. 
Show and play only if content-roll is visible in viewport.

## How to use:

Insert to your page content:

```html
<div class="vast-contentroll" 
     style="width: 640px; height: 480px;"
     data-vast="https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator="></div>

```


Insert before close body tag:
```html
<script async src="https://cdn.jsdelivr.net/gh/nechehin/vast-contentroll@latest/vast-contentroll.min.js"></script>
```


## Options
Options can sets as data attributes:

- data-vast (required) - VAST xml url
- data-debug - enable or disable log to console, true or false, default false
- data-collapse - collapse div after ads completed, true or false, default false
- data-companion - show companion ads image after video ads competed, true or false, default false

Example:

```html
<div class="vast-contentroll" 
     style="width: 640px; height: 480px;"
     data-debug="true"
     data-collapse="true"
     data-companion="true"
     data-vast="https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator="></div>
<script async src="https://cdn.jsdelivr.net/gh/nechehin/vast-contentroll@latest/vast-contentroll.min.js"></script>
```
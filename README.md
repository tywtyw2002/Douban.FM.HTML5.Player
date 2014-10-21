# Douban.FM HTML5 Player

Click a bookmark, and listen music without flash.

# Usage
Upload all file to web hosting, and using Bookmarks to enable Html5 player.

```
javascript:(function(){var u='http://example.com/douban'; var r=new Date().getTime(); var js=document.createElement('script'); js.src=u+'.js?r='+r; var css=document.createElement('link'); css.rel='stylesheet'; css.type='text/css'; css.href=u+'.css?r='+r; $('body').append(js).append(css); })();
```

# ToDo
- [x] Add rate/unrate/bye/next Function.
- [x] Add Music Pause control.
- [ ] Add Music volum control.
- [x] Add Music processbar/time remaining.
- [ ] Work for Channel choose.
- [ ] Add support with fmx163.

# Credits

- [Douban-FM-html5-bookmark](https://github.com/picasso250/Douban-FM-html5-bookmark)
- [fmx163](https://github.com/piglei/fmx163)


# License (MIT)
Copyright (c) 2014 Tianyi Wu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

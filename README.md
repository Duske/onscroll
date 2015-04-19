#onscroll [![Build Status](https://travis-ci.org/Duske/onscroll.svg?branch=master)](https://travis-ci.org/Duske/onscroll)

> a simple plugin to do onscroll actions
## Features

- Dependency-free.
- Simple markup.
- Optimized scroll handling

## Usage
```js
    var scrollHandler = new Onscroll({
        elements: document.getElementsByClassName('scrollElement'),
        onScrollFunction: function(element) {
            //Do something with the element when scrolled on
            element.classList.add('scrolledTo');
        },
        checkPositionBuffer: window.innerHeight / 2
    });
```


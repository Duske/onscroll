#onscroll [![Build Status](https://travis-ci.org/Duske/onscroll.svg?branch=master)](https://travis-ci.org/Duske/onscroll)

> a small, fast and dependency-free library to do onscroll actions

## Features

- Dependency-free.
- Simple setup.
- Small (3KB)
- Optimized scroll handling

OnScroll decouples the scroll event from the browser to minimize the weight it causes. The callback function runs within a requestAnimationFrame()-Call to optimize rendering. The weight can be reduced even more by providing a timeout when the callback function should be executed.

## Usage
HTML

```html
    <script src="onscroll.js"></script>
```
JavaScript

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

##Options

- **elements**: All elements the onScrollFunction should be applied to
- **onScrollFunction**: The callback function which runs when a element is scrolled on
- **threshold**: Adjust the extra pixels added to an element's position calculation to fire the onScrollFunction. Positive values make it fired sooner. The default is one third of the viewport height.

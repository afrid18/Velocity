<p align='center'>
  <img align='center' src="https://i.ibb.co/k0TDzqf/velocity-logo.png"/>
</p>
<h1 align="center"> Velocity </h1>

<p align='center'>
<img src="https://i.ibb.co/yYDC3DV/velocity-demo.gif" />
A fast automatic file executor on file change!
</p>

# Installation

```sh
npm install -g @afrid18/velocity
```

# Usage
```sh

Options:
      --version   Show version number                                  [boolean]
  -f, --filename  File to watch over!                                 [required]
  -i, --input     input for program
      --help      Show help                                            [boolean]

```


### after installing using npm
```sh
velocity -f velocity-demo.cpp
```


### using npx

```sh
npx @afrid18/velocity -f velocity-demo.cpp
```



## TO DO's 

- [x] Arguments parsing
- [x] Detect filetype
- [x] Watching the file for changes
- [x] Working with the commands specific to file (cpp, c, python, javascript)
- [x] Exiting the app on pressing q
- [ ] Rebranding! **IMP**

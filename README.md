# HCPSS canvas-files

This repository contains all of the JS, CSS, font, and image assets used in HCPSS's instance of Canvas.

## Download and run from registry

```
$ docker pull reg.hcpss.org/canvas/canvas-files
$ docker run -d -p 8080:80 reg.hcpss.org/canvas/canvas-files
```

## Alternatively

### 1. Download and build
```
$ git clone git@github.com:HCPSS/canvas-files.git
$ cd canvas-files
$ docker build -t canvas-files .
```

### 2. Run
```
$ docker run -d -p 8080:80 canvas-files
```

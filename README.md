# Three JS 공부
## ThreeJS란?
WebGL을 쉽게 사용할 수 있도록 해주는 JS기반 라이브러리입니다.

WebGL: Web Graphics Library

<a href="https://threejs.org/">Three JS를 활용한 웹 사이트</a>

<a href="https://threejs.org/docs/index.html#manual/en/introduction/Installation">공식문서</a>

<a href="https://threejs.org/manual/#ko/fundamentals">참고사이트</a>
## 프로젝트 생성
폴더생성 후 해당 폴더 vscode로 열고 아래 명령 실행
```
npm create vite@latest ./ -- --template vinilla
```

이후 불필요한 파일들 삭제해주고 아래 명령 실행
```
npm install three
```

### Camera
PerspectiveCamera(원근 카메라)
- 일반적인 카메라
- 멀리 있는 물체를 가까이 있는 것보다 상대적으로 작게 보이도록 함

OrthographicCamera(정사영 카메라)

## 프로젝트
### main.js
```js
import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene() // 촬영장소 만들기
const camera = new THREE.PerspectiveCamera(
    60, // fov: 시야각
    window.innerWidth/window.innerHeight, // aspect: 촬영하는 장면에 가로와 세로의 비율
    0.1, // near
    100 // far
)
camera.position.y = 1
camera.position.x = 3
camera.position.z = 7


const geometry = new THREE.BoxGeometry(1,1,1) // Mesh 넓이, 높이, 깊이
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material) // mesh 생성 geometry와 material 필요

scene.add(mesh)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
})

renderer.render(scene, camera)
```
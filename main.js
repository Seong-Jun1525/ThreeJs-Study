import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer({antialias: true})
// antialias는 box mesh 등의 끝부분이 우글우글 거리는 걸 없애줌
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 5) // 색, 색의 세기
directionalLight.castShadow = true
directionalLight.position.set(3,4,5)
directionalLight.lookAt(0, 0, 0)
scene.add(directionalLight)

// PlaneGeometry 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2 //  PI는 180°. 즉, 총 -90°만큼 회전
floor.receiveShadow = true // 그림자를 받을 수 있게 해줌
floor.castShadow = true
scene.add(floor)

const geometry = new THREE.BoxGeometry(1,1,1) // Mesh 넓이, 높이, 깊이
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const material = new THREE.MeshStandardMaterial({color: 0xff0000})
// MeshBasicMaterial이 아닌 Material은 빛의 영향을 받는다
const mesh = new THREE.Mesh(geometry, material) // mesh 생성 geometry와 material 필요
mesh.castShadow = true
mesh.position.y = 0.5
scene.add(mesh)

// CapsuleGeometry 생성
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30)
const capsuleMaterial = new THREE.MeshStandardMaterial({color: 0xffff00})
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsuleMesh.position.set(3, 1.75, 0)
capsuleMesh.receiveShadow = true
capsuleMesh.castShadow = true
scene.add(capsuleMesh)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

// orbitControls가 정상적으로 동작하기 위해 requestAnimation 프레임사용

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
})

const render = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()
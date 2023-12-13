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
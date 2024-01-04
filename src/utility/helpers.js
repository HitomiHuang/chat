import Swal from 'sweetalert2'
import axios from 'axios'

const baseURL = 'https://protected-ocean-08526.herokuapp.com/'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export const apiHelper = axios.create({
  baseURL
})
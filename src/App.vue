<template>
    <nav class="nav__container">
      <img class="nav__logo" src="./assets/icon-left-font-monochrome-white.svg" alt="logo Groupomania">
      <div class="nav__menu">
      <router-link to="/">
        <svg class="nav__menu_icons" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="35" height="35"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,10.75l-75.25,53.75v96.75h53.75v-43c0,-11.87875 9.62125,-21.5 21.5,-21.5c11.87875,0 21.5,9.62125 21.5,21.5v43h53.75v-96.75z"></path></g></g></svg>
      </router-link> 
      <router-link to="/newPublication">
        <svg class="nav__menu-icons" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="35" height="35"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,6.88c-43.65603,0 -79.12,35.46397 -79.12,79.12c0,43.65603 35.46397,79.12 79.12,79.12c43.65603,0 79.12,-35.46397 79.12,-79.12c0,-43.65603 -35.46397,-79.12 -79.12,-79.12zM86,13.76c39.93779,0 72.24,32.30221 72.24,72.24c0,39.93779 -32.30221,72.24 -72.24,72.24c-39.93779,0 -72.24,-32.30221 -72.24,-72.24c0,-39.93779 32.30221,-72.24 72.24,-72.24zM82.56,44.72v37.84h-37.84v6.88h37.84v37.84h6.88v-37.84h37.84v-6.88h-37.84v-37.84z"></path></g></g></svg>
      </router-link>
      <router-link to="/Profil">
        <svg class="nav__menu-icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="0 0 121 120" version="1.1">
        <g id="surface1">
        <path style=" stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" d="M 60.503906 7.828125 C 89.546875 7.859375 113.082031 31.199219 113.113281 60.003906 C 113.140625 68.398438 111.097656 76.671875 107.167969 84.109375 C 103.363281 91.300781 97.9375 97.523438 91.3125 102.296875 C 72.921875 115.472656 48.085938 115.472656 29.695312 102.296875 C 23.0625 97.527344 17.636719 91.300781 13.832031 84.109375 C 9.902344 76.671875 7.863281 68.398438 7.890625 60.003906 C 7.921875 31.199219 31.460938 7.859375 60.503906 7.828125 M 60.503906 0 C 27.089844 0 0 26.863281 0 60.003906 C 0 93.140625 27.089844 120.003906 60.503906 120.003906 C 93.917969 120.003906 121.003906 93.140625 121.003906 60.003906 C 121.003906 26.863281 93.917969 0 60.503906 0 Z M 60.503906 0 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" d="M 64.328125 75.695312 C 77.421875 75.714844 88.03125 86.238281 88.042969 99.222656 L 88.042969 104.441406 C 71.144531 114.722656 49.855469 114.722656 32.957031 104.441406 L 32.957031 99.222656 C 32.96875 86.238281 43.578125 75.714844 56.671875 75.695312 L 64.328125 75.695312 M 64.328125 67.871094 L 56.671875 67.871094 C 39.214844 67.871094 25.0625 81.910156 25.0625 99.222656 L 25.0625 108.613281 C 46.214844 123.773438 74.785156 123.773438 95.9375 108.613281 L 95.9375 99.222656 C 95.9375 81.910156 81.785156 67.871094 64.328125 67.871094 Z M 64.328125 67.871094 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" d="M 60.503906 38.25 C 65.972656 38.25 70.40625 42.648438 70.402344 48.070312 C 70.402344 53.496094 65.96875 57.890625 60.5 57.890625 C 55.03125 57.886719 50.597656 53.488281 50.601562 48.066406 C 50.605469 42.644531 55.039062 38.253906 60.503906 38.25 M 60.503906 30.425781 C 50.675781 30.421875 42.707031 38.320312 42.703125 48.066406 C 42.703125 57.816406 50.671875 65.71875 60.5 65.714844 C 70.328125 65.714844 78.292969 57.8125 78.289062 48.066406 C 78.289062 38.324219 70.324219 30.425781 60.503906 30.425781 Z M 60.503906 30.425781 "/>
        </g>
        </svg>
      </router-link>
      <router-link to="/Connect">
        <svg class="nav__menu-icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="0 0 70 70" version="1.1">
        <g id="surface1">
        <path style="fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke:#ffffff;stroke-opacity:1;stroke-miterlimit:4;" d="M 19.791518 10.120536 L 7.75 10.120536 " transform="matrix(2.916667,0,0,2.916667,5.833333,5.833333)"/>
        <path style="fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke:#ffffff;stroke-opacity:1;stroke-miterlimit:4;" d="M 16.863839 7.204911 L 19.792857 10.120536 L 16.863839 13.036161 " transform="matrix(2.916667,0,0,2.916667,5.833333,5.833333)"/>
        <path style="fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke:#ffffff;stroke-opacity:1;stroke-miterlimit:4;" d="M 0.259225 5.629911 C 0.588689 2.05 1.929314 0.749554 7.258332 0.749554 C 14.359225 0.749554 14.359225 3.059821 14.359225 10 C 14.359225 16.940179 14.359225 19.250446 7.258332 19.250446 C 1.929314 19.250446 0.588689 17.95 0.259225 14.370089 " transform="matrix(-2.916667,0,0,2.916667,48.470917,5.833333)"/>
        </g>
        </svg>
      </router-link>
      </div>
    </nav>
    <router-view/>
</template>

<style>

.nav__container{
  display: flex;
  justify-content: space-between;
  padding: 40px 0 40px 0;
  background-color: #7096AA;
}

.nav__logo{
  width: 300px;
  height: auto;
  padding-left: 40px;
}

.nav__menu{
  padding-right: 40px;
}

.nav__menu-icons{
  padding-left: 80px;
}
</style>

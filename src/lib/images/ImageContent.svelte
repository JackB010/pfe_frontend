<script>
    import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';

    import aza from './../../aza.jpg';
    let img = 1;
</script>

<div>
    <p class="text-black dark:text-white mx-3 mb-2 line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat odit
        ipsa suscipit praesentium ipsum, voluptas adipisci earum molestiae? Odio
        provident, sed recusandae aliquid nobis ipsa quos minus quibusdam
    </p>
    <img
        src="{aza}"
        alt="aza"
        class="object-cover p-2 {img == 2 ? 'hidden' : 'block'} rounded-2xl"
    />
    <img
        src="{aza}"
        alt="aza"
        class="object-cover p-2 {img == 1 ? 'hidden' : 'block'} rounded-2xl"
    />
</div>

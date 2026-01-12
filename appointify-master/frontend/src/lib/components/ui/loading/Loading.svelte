<script>
    import {Loader} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {slide, fade} from "svelte/transition"
</script>

<div class="h-screen w-screen m-auto flex flex-col items-center align-middle justify-center" in:slide out:fade>
    <div class="flex flex-row items-center gap-2 transition ease-in-out duration-500 select-none">
        <Icon src={Loader} class="w-5 animate-spin"/>
    </div>
</div>
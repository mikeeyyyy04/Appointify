<script lang="ts">
    import {RefreshCw} from "@steeze-ui/lucide-icons";
    import {Button} from "@/components/ui/button/index.js";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {createEventDispatcher} from "svelte";
    import { slide } from "svelte/transition"

    export let disabled: boolean = false
    export let loading: boolean = false

    let classes = "rounded-full bg-ube disabled:bg-ube active:bg-ube focus:bg-ube hover:bg-ube" + ($$props['class'] ?? "")
    const dispatcher = createEventDispatcher()

    function click() {
        dispatcher('click')
    }
</script>

<Button on:click={click} class={classes} disabled={disabled || loading}>
    {#if loading}
        <div in:slide>
            <Icon src="{RefreshCw}" class="mr-2 h-4 w-4 animate-spin"/>
        </div>
    {:else}
        <slot/>
    {/if}
</Button>
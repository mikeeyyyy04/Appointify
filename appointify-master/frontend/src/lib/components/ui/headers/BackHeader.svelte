<script lang="ts">
    import {ChevronLeft} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {createEventDispatcher} from "svelte";

    export let type: "button" | "a" = "button"
    export let href = "/"

    export let textColor = "text-black"

    const dispatcher = createEventDispatcher()
    function goBack() {
        dispatcher('click')
    }
</script>
{#if type === "a"}
    <a href={href} class="{textColor} flex flex-row items-center gap-2 active:opacity-50 transition ease-in-out duration-500 text-lg font-medium pb-8">
        <Icon src="{ChevronLeft}" size="18"/>
        <slot/>
    </a>
{:else}
    <button on:click={goBack} class="{textColor} flex flex-row items-center gap-2 active:opacity-50 transition ease-in-out duration-500 text-lg font-medium pb-8">
        <Icon src="{ChevronLeft}" size="18"/>
        <slot/>
    </button>
{/if}
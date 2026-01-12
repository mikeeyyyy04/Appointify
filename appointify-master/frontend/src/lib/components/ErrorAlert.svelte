<script lang="ts">
    import type {AlertError} from "$lib/types";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {OctagonAlert, X} from "@steeze-ui/lucide-icons";

    export let error: AlertError | null
    export let theme: "ube" | "default" = "default"

    const background = theme === "ube" ? "bg-creamy-ube border-ube" : "bg-zinc-200"
    const text = theme ===  "ube" ? "text-zinc-700" : "text-zinc-700"
</script>

{#if error != null}
    <div class="border rounded-2xl {background} bg-opacity-60 px-8 py-4 mb-4">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-2 items-center">
                <Icon src={OctagonAlert} size="18" class="text-red-500"/>
                <h3 class="text-lg font-bold text-red-500">{error.title}</h3>
            </div>
            <button on:click={() => error = null}>
                <Icon src={X} size="16" class="text-red-500"/>
            </button>
        </div>
        <p class="{text}">{error.description}</p>
    </div>
{/if}
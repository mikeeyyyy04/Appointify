<script lang="ts">
    import {Icon} from "@steeze-ui/svelte-icon";
    import type {IconSource} from "@steeze-ui/lucide-icons";
    export let icon: IconSource
    export let value: string
    export let placeholder: string

    export let borderPosition: string
    export let roundedPosition: string
</script>
<div class="w-full px-4 py-2.5 rounded-3xl {roundedPosition} bg-zinc-50 border border-mountbatten-pink {borderPosition} flex flex-row gap-4 items-center">
    <Icon src={icon} size="18"/>
    <input type="text" bind:value={value} placeholder={placeholder} class="w-full bg-transparent outline-0 text-ube placeholder:text-ube placeholder:text-opacity-50" maxlength="64"/>
</div>
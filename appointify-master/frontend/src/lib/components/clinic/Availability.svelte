<script lang="ts">
    import {Bed, Sun} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import type {Clinic} from "@/types/clinic";

    export let clinic: Clinic
</script>

<div class="flex flex-row gap-2 items-center">
    {#if clinic.available}
        <Icon src={Sun} size="16" class="text-green-500"/>
    {:else}
        <Icon src={Bed} size="16" class="text-orange-500"/>
    {/if}
    <p class="text-sm font-bold {clinic.available ? 'text-green-500' : 'text-orange-500'}">
        {#if clinic.available}
            Open to customers
        {:else}
            Closed from customers
        {/if}
    </p>
</div>
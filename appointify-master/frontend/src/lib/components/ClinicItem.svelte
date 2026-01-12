<script lang="ts">
    import {Hospital} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import type {Clinic} from "@/types/clinic";
    import {viewingClinicId} from "@/stores";

    export let clinic: Clinic

    function redirect() {
        $viewingClinicId = clinic._id
        setTimeout(() => document.getElementById('_clinic_view')?.click(), 50)
    }
</script>
<button on:click={redirect} class="rounded-3xl bg-zinc-50 border border-zinc-300 px-4 py-5 flex flex-row justify-between items-center">
    <div class="flex flex-row gap-4 items-center">
        <Icon src="{Hospital}" size="18" class="text-zinc-500"/>
        <h3 class="font-bold text-zinc-500">{clinic.name}</h3>
    </div>
    {#if clinic.available}
        <p class="text-xs text-green-500">Available</p>
    {:else}
        <p class="text-xs text-red-500">Unavailable</p>
    {/if}
</button>
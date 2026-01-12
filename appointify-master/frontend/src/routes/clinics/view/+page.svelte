<script lang="ts">
    import type {Clinic} from "@/types/clinic";
    import type {AlertError} from "@/types";
    import {onDestroy, onMount} from "svelte";
    import {fetchClinic} from "@/requests/fetchClinic";
    import CenteredLoading from "@/components/ui/loading/CenteredLoading.svelte";
    import ErrorAlert from "@/components/ErrorAlert.svelte";
    import {viewingClinicId} from "@/stores";
    import BackHeader from "@/components/ui/headers/BackHeader.svelte";
    import Availability from "@/components/clinic/Availability.svelte";
    import RefreshedTime from "@/components/clinic/RefreshedTime.svelte";
    import ServingNumber from "$lib/components/clinic/ServingNumber.svelte";

    //Assigning the viewing clinic ID from the store
    let id = $viewingClinicId!

    // Declaring variables for clinic data and errors
    let clinic: Clinic | null
    let error: AlertError | null

    // Variables for handling refresh timing and state
    let lastRefreshed: Date | undefined
    let refreshClinicTimer: number | undefined;
    let refreshing: boolean = false

    // onMount lifecycle function to load clinic data and set up auto-refresh
    onMount(async () => {
        await loadClinic()
        // Set interval to refresh clinic data every 60 seconds
        refreshClinicTimer = setInterval(async () => {
             await loadClinic()
        }, 1_000 * 60)
    })

    // onDestroy lifecycle function to clear the refresh timer
    onDestroy(() => {
        clearTimeout(refreshClinicTimer)
        refreshClinicTimer = undefined
    })

    // Function to load clinic data
    async function loadClinic() {
        if (refreshing) return // Prevents multiple simultaneous refreshes
        try {
            lastRefreshed = undefined // Clear the last refreshed time before loading
            refreshing = true // Set refreshing state to true
            clinic = await fetchClinic(id) // Fetch clinic data
            lastRefreshed = new Date() // Set the last refreshed time to now
        } catch (e) {
            error = {
                title: "An error occurred.",
                description: e?.message ?? "Unknown error."
            }
        } finally {
            refreshing = false
        }
    }
</script>
<div class="flex flex-col gap-4 min-h-full w-full">
    {#if clinic == null}
        {#if error == null}
            <CenteredLoading/>
        {:else}
            <ErrorAlert error={error}/>
        {/if}
    {:else}
        <BackHeader href="/clinics" type="a">Waiting Room</BackHeader>
        <div class="flex flex-col">
            <h2 class="text-3xl font-bold">{clinic.name}</h2>
            <Availability bind:clinic/>
        </div>
        <div class="h-[72%] border border-zinc-100 bg-zinc-50 rounded-3xl {refreshing ? 'animate animate-pulse' : ''} duration-500 transition ease-in-out">
            <div class="flex flex-col pr-6 pt-4 items-end justify-end">
                <RefreshedTime bind:lastRefreshed/>
            </div>
            <ServingNumber serving={clinic.serving}/>
        </div>
    {/if}
</div>
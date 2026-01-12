<script lang="ts">
    import {Icon} from "@steeze-ui/svelte-icon";
    import {ChevronLeft, Search} from "@steeze-ui/lucide-icons";
    import {onMount} from "svelte";
    import {fetchClinics} from "@/requests/fetchClinics";
    import type {Clinic} from "@/types/clinic";
    import ClinicItem from "@/components/ClinicItem.svelte";
    import type {AlertError} from "@/types";
    import ErrorAlert from "@/components/ErrorAlert.svelte";
    import CenteredLoading from "@/components/ui/loading/CenteredLoading.svelte";
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";
    import BackHeader from "@/components/ui/headers/BackHeader.svelte";

    // Declare a variable for the search query
    let search = ''
    // Declare a variable to hold the list of clinics
    let clinics: Clinic[] | null = null
    // Declare a variable to hold search error details
    let searchError: AlertError | null
    // Declare a variable to hold the search timeout ID
    let searchTimeout: NodeJS.Timeout | undefined

    // onMount lifecycle hook to load clinics when the component mounts
    onMount(async () => {
        await loadClinics()
    })

    // Function to handle search input with a debounce
    async function searchClinics() {
        // Clear previous timeout if it exists
        if (searchTimeout) clearTimeout(searchTimeout)
        // Set a new timeout to delay the search request
        searchTimeout = setTimeout(loadClinics, 500)
    }

    // Function to load clinics based on the search query
    async function loadClinics() {
        try {
            // Reset clinics to null before fetching new data
            clinics = null
            // Determine the search query
            let searchQuery = search === '' ? null : search
            // Fetch clinics based on the search query
            clinics = await fetchClinics(searchQuery)
        } catch (e) {
            // Handle any errors that occur during the fetch
            searchError = {
                title: "An error occurred.",
                description: e?.message ?? "Unknown error."
            }
        }
    }

    // Function to reload clinics when the window gains focus
    function onFocus() {
        loadClinics()
    }
</script>

<svelte:window on:focus={onFocus}/>
<div class="flex flex-col gap-4 min-h-full w-full">
    <ProgrammaticableRedirect id="_clinic_view" href="/clinics/view"/>
    <BackHeader type="a" href="/">Clinics</BackHeader>
    <form on:submit={loadClinics}>
        <div class="w-full px-4 py-2.5 rounded-3xl bg-zinc-50 border border-zinc-300 flex flex-row gap-4 items-center">
            <Icon src={Search} size="18"/>
            <input type="text" on:input={searchClinics} placeholder="Search clinic..." bind:value={search} class="bg-transparent outline-0"/>
        </div>
        <button type="submit" class="hidden"></button>
    </form>
    {#if clinics == null}
        {#if searchError == null}
            <CenteredLoading/>
        {:else}
            <ErrorAlert error={searchError}/>
        {/if}
    {:else}

    <!-- Display list of clinics if fetched successfully -->
        <div class="flex flex-col gap-2">
            {#each clinics as clinic}
            <!-- ClinicItem component for each clinic -->
                <ClinicItem clinic={clinic}/>
            {/each}
        </div>
    {/if}
</div>
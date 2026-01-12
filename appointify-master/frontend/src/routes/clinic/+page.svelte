<script lang="ts">
    import type {Clinic} from "@/types/clinic";
    import type {AlertError} from "@/types";
    import {onDestroy, onMount} from "svelte";
    import {
        decrementClinicServing, deleteClinic,
        fetchOwnClinic,
        incrementClinicServing,
        setAvailableClinic,
        setUnavailableClinic
    } from "@/requests/fetchClinic";
    import {Minus, Plus, Trash2} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import CenteredLoading from "@/components/ui/loading/CenteredLoading.svelte";
    import ErrorAlert from "@/components/ErrorAlert.svelte";
    import {token} from "@/stores";
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";
    import {logout} from "@/requests/authenticate";
    import BackHeader from "@/components/ui/headers/BackHeader.svelte";
    import {Haptics} from "@capacitor/haptics";
    import {Button} from "@/components/ui/button";
    import {Label} from "@/components/ui/label";
    import {Switch} from "@/components/ui/switch";
    import Availability from "@/components/clinic/Availability.svelte";
    import {goto} from "$app/navigation";

   // Declaring reactive variables
    let clinic: Clinic | null
    let error: AlertError | null

    let refreshClinicTimer: NodeJS.Timeout | undefined;
    let loading = false

    let showDeleteWarning = false

     // Fetch clinic data on component mount
    onMount(async () => {
        await loadClinic()
        refreshClinicTimer = setInterval(async () => {
            await loadClinic()
        }, 1_000 * 60)// Refresh clinic data every minute
    })

     // Clear the interval timer on component destroy
    onDestroy(() => {
        clearTimeout(refreshClinicTimer)
        refreshClinicTimer = undefined
    })

    // Function to load clinic data
    async function loadClinic() {
        try {
            clinic = await fetchOwnClinic($token!)
            if (clinic == null) {
                goto('/clinics/new', { replaceState: true })
            }
        } catch (e) {
            error = {
                title: "An error occurred.",
                description: e?.message ?? "Unknown error."
            }
        }
    }

     // Function to log out from clinic
    function logoutClinic() {
        try {
            logout($token!)
        } finally {
            $token = null
            document.getElementById('_home')?.click()
        }
    }

     // Function to log out from clinic
    async function runAsyncSingleClinicTask(task: (token: string) => Promise<Clinic>) {
        if (loading) return
        try {
            loading = true
            clinic = await task($token!)
        } catch (e) {
            error = {
                title: "An error occurred.",
                description: e?.message ?? "Unknown error."
            }
        } finally {
            loading = false
        }
    }

    // Increment clinic serving count
    async function increment() {
        await Haptics.impact()
        await runAsyncSingleClinicTask(incrementClinicServing)
    }

    // Decrement clinic serving count
    async function decrement() {
        await Haptics.impact()
        await runAsyncSingleClinicTask(decrementClinicServing)
    }

    // Set clinic as unavailable
    async function setUnavailable() {
        await runAsyncSingleClinicTask(setUnavailableClinic)
    }

    // Set clinic as available
    async function setAvailable() {
        await runAsyncSingleClinicTask(setAvailableClinic)
    }

    // Toggle clinic availabilit
    async function toggleAvailability() {
        await Haptics.impact()
        if (clinic!.available) {
            await setUnavailable()
        } else {
            await setAvailable()
        }
    }

    // Toggle delete warning visibility
    function toggleDeleteWarning() {
        Haptics.impact()
        showDeleteWarning = !showDeleteWarning
    }

    // Delete clinic
    async function del() {// If already loading, return immediatel
        if (loading) return
        try {
            loading = true // Set loading flag to true
            await deleteClinic($token!)// Call the deleteClinic function with the provided token
            logoutClinic()// Log out the clinic user
        } catch (e) {// Handle any errors by setting the error object
            error = {
                title: "An error occurred.",
                description: e?.message ?? "Unknown error."
            }
        } finally {
            loading = false
        }
    }
</script>
<div class="flex flex-col gap-4 min-h-full w-full">
    <ProgrammaticableRedirect id="_home" href="/"/>
    <ProgrammaticableRedirect id="new_clinic" href="/clinics/new"/>
    {#if clinic == null}
        {#if error == null}
            <CenteredLoading/>
        {:else}
            <ErrorAlert error={error}/>
        {/if}
    {:else}
        {#if !showDeleteWarning}
            <BackHeader type="button" on:click={logoutClinic}>Logout</BackHeader>
            <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                    <h2 class="text-3xl font-bold">{clinic.name}</h2>
                    <button on:click={toggleDeleteWarning} class="active:opacity-50 hover:opacity-80 transition ease-in-out duration-500">
                        <Icon src={Trash2} size="18" class="text-red-500"/>
                    </button>
                </div>
                <Availability bind:clinic/>
            </div>
            <div class="h-[72%] border border-zinc-100 bg-zinc-50 rounded-3xl py-10 {loading ? 'animate animate-pulse' : ''} duration-500 transition ease-in-out">
                <div class="flex flex-col justify-center align-middle items-center h-full">
                    <div class="flex flex-row items-center gap-4">
                        <button on:click={decrement} class="text-orange-400">
                            <Icon src="{Minus}" size="16"/>
                        </button>
                        <h1 class="text-4xl font-bold text-orange-400">{clinic.serving}</h1>
                        <button on:click={increment} class="text-orange-400">
                            <Icon src="{Plus}" size="16"/>
                        </button>
                    </div>
                    <h2 class="text-xs text-zinc-400">Currently serving</h2>
                </div>
            </div>
            <div class="px-5 border border-zinc-100 bg-zinc-50 rounded-3xl py-5">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex flex-col max-w-[12rem]">
                        <Label class="text-zinc-800 font-bold text-lg">Availability</Label>
                        <p class="text-xs text-zinc-600">Indicates whether the clinic is open to customers.</p>
                    </div>
                    <Switch class="data-[state=checked]:bg-green-400" disabled={loading} checked={clinic.available} onCheckedChange={toggleAvailability}/>
                </div>
            </div>
        {:else}
            <BackHeader type="button" on:click={toggleDeleteWarning}></BackHeader>
            <div class="flex flex-col">
                <h2 class="text-2xl font-bold text-red-500">Are you sure you want to delete {clinic.name}?</h2>
                <p class="font-light text-zinc-500 my-2">
                    You will not be able to reverse this action upon confirming, and any data related to the clinic
                    prior to the deletion will no longer be available.
                    <br/>
                    <br/>
                    All users will also not be able to search, nor find the clinic in the app, effective immediately
                    upon deleting the clinic.
                </p>
            </div>
            <div class="fixed bottom-0 left-0 right-0 px-5 mb-12">
                <div class="flex flex-row justify-between gap-1">
                    <Button class="w-full active:opacity-50 transition ease-in-out duration-500" variant="destructive" on:click={del}>Confirm</Button>
                    <Button class="w-full active:opacity-50 transition ease-in-out duration-500" variant="secondary" on:click={toggleDeleteWarning}>Cancel</Button>
                </div>
            </div>
        {/if}
    {/if}
</div>
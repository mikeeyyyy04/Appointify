<script lang="ts">
    import '../app.pcss';
    import {onMount} from "svelte";
    import { fade } from "svelte/transition"
    import Loading from "@/components/ui/loading/Loading.svelte";
    import {loadStores, token} from "@/stores";
    import {StatusBar} from "@capacitor/status-bar";
    import {requestUser} from "@/requests/fetchUser";
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";
    import { App }  from "@capacitor/app"
    import {Toast} from "@capacitor/toast";

    let loading = true
    let mountError: string | null = null

    let online = true
    let shouldCloseNextTime = false
    $: {
        if (shouldCloseNextTime) {
            setTimeout(() => {
                shouldCloseNextTime = false
            }, 2_500)
        }
    }

    onMount(async () => {
        try {
            StatusBar.hide()
                .then(() => StatusBar.setOverlaysWebView({ overlay: true }))

            App.addListener("backButton", async (ev) => {
                if (ev.canGoBack) {
                    window.history.back()
                } else {
                    if (shouldCloseNextTime) {
                        await App.exitApp()
                    } else {
                        shouldCloseNextTime = true
                        await Toast.show({
                            text: "Press Back again to exit application."
                        })
                    }
                }
            }).then()

            await loadStores()
            if ($token !== null) {
                const user = await requestUser($token)
                if (user === null) {
                    $token = null
                } else {
                    document.getElementById('_clinic')?.click()
                }
            }
            loading = false

        } catch (e) {
            mountError = e?.toString() ?? null
        }
    })
</script>

<svelte:window bind:online/>
{#if online}
    {#if mountError != null}
        <div in:fade class="rethink px-5 py-6 pt-16">
            <h1 class="text-2xl font-bold">Hey there!</h1>
            <h2 class="text-sm text-zinc-400">We apologize, but there was an issue while trying to load the application.</h2>
            <div class="my-2 py-2 border-t border-dashed border-zinc-600">
                <p>{mountError}</p>
            </div>
        </div>
    {:else}
        <ProgrammaticableRedirect id="_clinic" href="/clinic"/>
        {#if loading}
            <Loading/>
        {:else}
            <div in:fade class="px-5 py-6 pt-12 rethink">
                <slot/>
            </div>
        {/if}
    {/if}
{:else}
    <div in:fade class="rethink px-5 py-6 pt-16">
        <h1 class="text-2xl font-bold">Hey there!</h1>
        <h2 class="text-sm text-zinc-400">We apologize, but it seems like your network connection has gone offline.</h2>
        <div class="my-2 py-2 border-t border-dashed border-zinc-600">
            <p>Appointify requires internet connection to function. Please turn on your WiFi or mobile data, or find a
            location with better signal. Appointify will automatically restart itself once it detects there is an
            internet connection.</p>
        </div>
    </div>
{/if}
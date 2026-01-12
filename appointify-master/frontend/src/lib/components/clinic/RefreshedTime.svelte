<script lang="ts">
    import {RefreshCw} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {onDestroy, onMount} from "svelte";
    import TimeAgo from "javascript-time-ago";
    import en from "javascript-time-ago/locale/en";

    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    export let lastRefreshed: Date | undefined
    let refreshedAgo: string = refresh()
    let refreshClockTimer: NodeJS.Timeout | undefined;

    onMount(() => {
        refreshClockTimer = setInterval(() => {
            refreshedAgo = refresh()
        }, 1_000 * 10)
    })

    function refresh() {
        return lastRefreshed == undefined ? "Refreshing" : "Refreshed " + timeAgo.format(lastRefreshed);
    }

    onDestroy(() => {
        clearInterval(refreshClockTimer)
        refreshClockTimer = undefined
    })
</script>

<div class="text-zinc-300 text-xs flex flex-row items-center gap-1">
    <Icon src={RefreshCw} size="11"/>
    {refreshedAgo}
</div>
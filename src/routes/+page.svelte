<script>
  import AddWork from "../lib/components/work/AddWork.svelte";
  import WorkList from "../lib/components/work/WorkList.svelte";
</script>

<div class="home my-3">
  <h1 style="color: #62ffff; margin-bottom : 3vw;"><b>Project Manager</b></h1>

  <div class="row">
    <div class="col-6">
      <WorkList />
    </div>
    <div class="col-6">
      <AddWork />
    </div>
  </div>
</div>

<style>
  .home {
    margin-left: 20vw;
    margin-right: 20vw;
  }
</style>

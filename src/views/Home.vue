<script setup lang="ts">

</script>

<template>
  <LayoutViews>
    <div class="text-right">
      <BaseLink
        :link="{ name: 'startDeal' }"
      >
        <Button
          :aria-label="$t('startDeal')"
        >
          <span class="block" v-text="$t('startDeal')" />
        </Button>
      </BaseLink>
    </div>
    <div class="my-6">
      <Tab
        tab1="Proposals"
        tab2="Running Deals"
        tab3="Past Deals"
      >
        <template #tab1Content>
          <LayoutTabContent>
              <TabContentProposals />
          </LayoutTabContent>
        </template>
        <template #tab2Content>
          <LayoutTabContent>
            <TabContentRunningDeals />
          </LayoutTabContent>
        </template>
        <template #tab3Content>
          <LayoutTabContent>
            <TabContentPastDeals />
          </LayoutTabContent>
        </template>
      </Tab>
    </div>
  </LayoutViews>
</template>
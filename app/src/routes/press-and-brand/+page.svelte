<script>
  import ArticlesList from '$lib/components/ArticlesList.svelte';
  import Icon from '$lib/components/Icon.svelte';

  import { data } from '$lib/data.js';
  const pressArticles = data.pressArticles;

  const firstThreePressArticles = pressArticles.slice(0, 3).map((article) => {
    return article;
  });
</script>

<div
  class="bg-grid-2 mx-auto max-w-6xl bg-top bg-no-repeat px-6 pt-6 font-tasa-orbiter-display md:px-3 md:pt-16"
>
  <div
    class="lg:before:content-plus-detail-1 mb-16 text-gray-4 md:mb-20 lg:relative lg:before:absolute lg:before:right-0 lg:before:top-0"
  >
    <p class="mb-4">Navigate to</p>
    <div class="font-nb-architekt">
      <a
        class="rounded-[4px] bg-gray-12 px-4 py-3 text-sm text-gray-2"
        href="#press">Press</a
      >
      <a
        class="rounded-[4px] bg-gray-12 px-4 py-3 text-sm text-gray-2"
        href="#brand-kit">Brand Kit</a
      >
    </div>
  </div>
  <section>
    <div class="mb-16 md:mb-20">
      <h2
        id="press"
        class="mb-1 text-4xl font-semibold uppercase text-gray-1 md:text-7xl md:font-bold"
      >
        Press
      </h2>
      <p class="mb-12 text-lg font-medium text-gray-4 md:mb-20">
        See what others have been sayinga about Colosseum
      </p>
      <div>
        <h3
          class="mb-4 flex items-center gap-2 text-sm font-medium text-gray-4"
        >
          <Icon name="trend" /> Latest
        </h3>
        <div
          class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 md:hidden"
        >
          <ArticlesList articles={firstThreePressArticles} />
        </div>
        <div class="hidden md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-4">
          <ArticlesList articles={pressArticles} />
        </div>
      </div>
    </div>
  </section>
  <section>
    <div>
      <h2
        id="brand-kit"
        class="mb-1 text-4xl font-semibold uppercase text-gray-1 md:text-7xl md:font-bold"
      >
        Brand Kit
      </h2>
      <p class="mb-12 text-lg font-medium text-gray-4 md:mb-20">
        Get the latest brand design kits for your use
      </p>
      <div>
        <section>
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="mb-1 text-2xl font-medium text-gray-1">
                Download all assets
              </h3>
              <p class="text-gray-4">
                The latest full suite of Colosseum’s brand kit
              </p>
            </div>
            <a
              class="flex w-fit items-center gap-2 rounded-[4px] bg-gray-12 px-7 py-3 font-nb-architekt text-lg text-gray-2"
              href="#/">Download <Icon name="download" /></a
            >
          </div>
        </section>
        <hr class="my-6 border-gray-12" />
        <section>
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="mb-1 text-2xl font-medium text-gray-1">
                Download logomark
              </h3>
              <p class="text-gray-4">
                The latest full suite of Colosseum’s brand kit
              </p>
            </div>
            <a
              class="flex w-fit items-center gap-2 rounded-[4px] bg-gray-12 px-7 py-3 font-nb-architekt text-lg text-gray-2"
              href="#/">Download <Icon name="download" /></a
            >
          </div>
        </section>
        <hr class="my-6 border-gray-12" />
        <section>
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="mb-1 text-2xl font-medium text-gray-1">
                Download logotype
              </h3>
              <p class="text-gray-4">
                The latest full suite of Colosseum’s brand kit
              </p>
            </div>
            <a
              class="flex w-fit items-center gap-2 rounded-[4px] bg-gray-12 px-7 py-3 font-nb-architekt text-lg text-gray-2"
              href="#/">Download <Icon name="download" /></a
            >
          </div>
        </section>
      </div>
    </div>
  </section>
</div>

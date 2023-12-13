<script>
  import ArticlesList from '$lib/components/ArticlesList.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Element from '$lib/components/Element.svelte';

  import { data } from '$lib/data.js';
  const pressArticles = data.pressArticles;

  const firstThreePressArticles = pressArticles.slice(0, 3).map((article) => {
    return article;
  });
</script>

<div
  class="bg-grid-2 font-tasa-orbiter-display mx-auto max-w-6xl bg-top bg-no-repeat px-6 pt-6 md:px-3 md:pt-16"
>
  <div
    class="lg:before:content-plus-detail-1 text-gray-4 mb-16 md:mb-20 lg:relative lg:before:absolute lg:before:right-0 lg:before:top-0"
  >
    <p class="mb-4">Navigate to</p>
    <div class="font-nb-architekt">
      <a
        class="bg-gray-12 text-gray-2 rounded-[4px] px-4 py-3 text-sm"
        href="#press">Press</a
      >
      <a
        class="bg-gray-12 text-gray-2 rounded-[4px] px-4 py-3 text-sm"
        href="#brand-kit">Brand Kit</a
      >
    </div>
  </div>
  <section>
    <div class="mb-16 md:mb-20">
      <h2
        id="press"
        class="text-gray-1 mb-1 text-[40px] font-semibold uppercase leading-none md:text-[5.5rem] md:font-bold"
      >
        Press
      </h2>
      <p class="text-gray-4 mb-12 text-lg font-medium md:mb-20">
        See what others have been sayinga about Colosseum
      </p>
      <div>
        <h3
          class="text-gray-4 mb-4 flex items-center gap-2 text-sm font-medium"
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
    <div class="mb-7 md:mb-14">
      <div class="mb-10 flex items-center justify-between sm:mb-16">
        <div>
          <h2
            id="brand-kit"
            class="text-gray-1 mb-1 text-[40px] font-semibold uppercase leading-none md:text-[5.5rem] md:font-bold"
          >
            Brand Kit
          </h2>
          <p class="text-gray-4 text-lg font-medium">
            Get the latest brand design kits for your use
          </p>
        </div>
        <Element class="hidden sm:block" name="globe" />
      </div>
      <div>
        <section>
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="text-gray-1 mb-1 text-2xl font-medium">
                Download all assets
              </h3>
              <p class="text-gray-4">
                The latest full suite of Colosseum’s brand kit
              </p>
            </div>
            <a
              class="bg-gray-12 font-nb-architekt text-gray-2 flex w-fit items-center gap-2 rounded-[4px] px-7 py-3 text-lg"
              href="#/">Download <Icon name="download" /></a
            >
          </div>
        </section>
        <hr class="border-gray-12 my-6" />
        <section>
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="text-gray-1 mb-1 text-2xl font-medium">
                Download logomark
              </h3>
              <p class="text-gray-4">
                The latest full suite of Colosseum’s brand kit
              </p>
            </div>
            <a
              class="bg-gray-12 font-nb-architekt text-gray-2 flex w-fit items-center gap-2 rounded-[4px] px-7 py-3 text-lg"
              href="#/">Download <Icon name="download" /></a
            >
          </div>
        </section>
        <hr class="border-gray-12 my-6" />
        <section>
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0">
              <h3 class="text-gray-1 mb-1 text-2xl font-medium">
                Download logotype
              </h3>
              <p class="text-gray-4">
                The latest full suite of Colosseum’s brand kit
              </p>
            </div>
            <a
              class="bg-gray-12 font-nb-architekt text-gray-2 flex w-fit items-center gap-2 rounded-[4px] px-7 py-3 text-lg"
              href="#/">Download <Icon name="download" /></a
            >
          </div>
        </section>
      </div>
    </div>
  </section>
</div>

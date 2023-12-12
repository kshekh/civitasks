<script>
  import ArticlesList from '$lib/components/ArticlesList.svelte';
  import Icon from '$lib/components/Icon.svelte';

  import { data } from '$lib/data.js';
  const blogArticles = data.blogArticles;

  const featuredArticles = blogArticles.filter((article) => {
    return article.featured === true;
  });

  const latestArticles = blogArticles.filter((article) => {
    return article.featured === false;
  });
</script>

<div
  class="bg-grid-2 mx-auto max-w-6xl bg-top bg-no-repeat px-6 pt-6 font-tasa-orbiter-display md:px-3 md:pt-0"
>
  <section>
    <div>
      <!-- intro -->
      <div class="flex items-center justify-between">
        <div class="md:pt-40">
          <h1
            class="mb-1 text-4xl font-semibold uppercase text-gray-1 md:text-7xl md:font-bold"
          >
            Blog
          </h1>
          <p class="mb-12 text-lg font-medium text-gray-4 md:mb-20">
            Learn about the latest from Colosseum
          </p>
        </div>
        <img
          class="hidden sm:translate-y-9 sm:pr-4 md:block"
          src="/images/illustrations/illustration-7.png"
          alt=""
        />
      </div>

      <!-- blog section -->
      <div>
        <!-- featured articles -->
        <section>
          <div class="mb-6 md:mb-10">
            <h2
              class="mb-4 flex items-center gap-2 text-sm font-medium text-gray-4"
            >
              <Icon name="star" /> Featured
            </h2>
            <div
              class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4"
            >
              <ArticlesList articles={featuredArticles} />
            </div>
          </div>
        </section>

        <!-- latest articles -->
        <section>
          <div>
            <h2
              class="mb-4 flex items-center gap-2 text-sm font-medium text-gray-4"
            >
              <Icon name="trend" /> Latest
            </h2>
            <div
              class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 md:grid-cols-3"
            >
              <ArticlesList articles={latestArticles} />
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</div>

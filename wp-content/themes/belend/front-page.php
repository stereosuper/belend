<?php get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <header class='hero'>
            <div>
                <div class='banner-img' style='background-image: url(<?php echo get_the_post_thumbnail_url($post, 'full'); ?>)'></div>

                <div class='intro'>
                    <div class='text'>
                        <h1>
                            <?php
                                $title = get_field('title');
                                if( $title ) :
                            ?>
                                <?php echo $title['title1']; ?>
                                <?php if( $title['title2'] ) : ?>
                                    <span class='primary'><?php echo $title['title2']; ?></span>, <br>
                                <?php endif; ?>
                                <?php echo $title['title3']; ?>
                                <?php if( $title['title4'] ) : ?>
                                    <span class='secondary'><?php echo $title['title4']; ?></span>.
                                <?php endif; ?>
                            <?php else : the_title(); endif; ?>
                        </h1>

                        <?php the_content(); ?>
                    </div>
                    
                    <div class='container'>
                        <?php
                            $btn = get_field('btn');
                            if( $btn ) :
                        ?>
                            <a class='btn' href='<?php echo $btn['url']; ?>' <?php if( $btn['target'] ) echo "target='_blank'"; ?>>
                                <?php echo $btn['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class='container home-benefits-wrapper'>
                    <?php if( have_rows('benefits') ): ?>
                        <ul class='home-benefits'>
                            <?php while ( have_rows('benefits') ) : the_row(); ?>
                                <li>
                                    <?php echo wp_get_attachment_image(get_sub_field('icon'), 'full'); ?>
                                    <div>
                                        <span <?php if( get_sub_field('bold1') ) echo "class='bold' "; ?>><?php the_sub_field('text1'); ?></span>
                                        <span <?php if( get_sub_field('bold2') ) echo "class='bold' "; ?>><?php the_sub_field('text2'); ?></span>
                                    </div>
                                </li>
                            <?php endwhile; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        </header>

        <?php $loc = get_field('localisation'); if( $loc ) : ?>
            <section class='home-map'>
                <div class='container'>
                    <div class='txt'>
                        <h2><?php echo $loc['locTitle']; ?></h2>
                        <?php echo $loc['locText']; ?>
                        <?php
                            $locLink = $loc['locLink'];
                            if( $locLink ) :
                        ?>
                            <a href='<?php echo $locLink['url']; ?>' <?php if( $locLink['target'] ) echo "target='_blank'"; ?> class='link'>
                                <span><?php echo $locLink['title']; ?></span><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
                <?php echo wp_get_attachment_image($loc['img'], 'full'); ?>
            </section>
        <?php endif; ?>

        <section class='home-nb align-center'>
            <div class='container'>
                <?php if( get_field('nbText') ) : ?>
                    <h3><?php the_field('nbText'); ?></h3>
                    <span><?php the_field('nb'); ?></span>
                <?php endif; ?>
            </div>
        </section>
        
        <?php $quotes = get_field('quotes'); if( $quotes ) : ?>
            <section class='home-quotes-wrapper container'>
                <h2><?php echo $quotes['quotesTitle']; ?></h2>
                
                <?php if( $quotes['quotes'] ): ?>
                    <div class='home-quotes'>
                        <?php foreach( $quotes['quotes'] as $quote ) : ?>
                            <blockquote class='home-quote'>
                                <p><?php echo $quote['quote']; ?></p>
                                <cite>
                                    <div>
                                        <span class='name'><?php echo $quote['name']; ?></span>
                                        <?php echo $quote['job']; ?>
                                    </div>
                                    <div class='img'>
                                        <?php echo wp_get_attachment_image($quote['photo'], 'full'); ?>
                                    </div>
                                </cite>
                            </blockquote>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </section>
        <?php endif; ?>

        <section class='container-desk'>
            <?php $pro = get_field('pro', 'options'); if( $pro ) : ?>
                <div class='target t-pro'>
                    <div class='txt'>
                        <h2><?php echo $pro['title']; ?></h2>
                        <?php echo $pro['text']; ?>

                        <?php if( $pro['btn'] ) : ?>
                            <a class='btn-invert' href='<?php echo $pro['btn']['url']; ?>' <?php if( $pro['btn']['target'] ) echo "target='_blank'"; ?>>
                                <?php echo $pro['btn']['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </a>
                        <?php endif; ?>
                    </div>
                    <div class='bg' style='background-image:url(<?php echo wp_get_attachment_url($pro['img'], 'full'); ?>)'></div>
                </div>
            <?php endif; ?>

            <?php $individual = get_field('individual', 'options'); if( $individual ) : ?>
                <div class='target t-individual'>
                    <div class='txt'>
                        <h2><?php echo $individual['title']; ?></h2>
                        <?php echo $individual['text']; ?>

                        <?php if( $individual['btn'] ) : ?>
                            <a class='btn-invert' href='<?php echo $individual['btn']['url']; ?>' <?php if( $individual['btn']['target'] ) echo "target='_blank'"; ?>>
                                <?php echo $individual['btn']['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </a>
                        <?php endif; ?>
                    </div>
                    <div class='bg' style='background-image:url(<?php echo wp_get_attachment_url($individual['img'], 'full'); ?>)'></div>
                </div>
            <?php endif; ?>
        </section>

        <?php if( have_rows('benefits', 'options') ): ?>
            <section class='container'>
                <ul class='benefits'>
                    <?php while ( have_rows('benefits', 'options') ) : the_row(); ?>
                        <li>
                            <div class='title'>
                                <?php echo wp_get_attachment_image(get_sub_field('icon'), 'full'); ?>
                                <h3><?php the_sub_field('title'); ?></h3>
                            </div>
                            <?php the_sub_field('text'); ?>
                        </li>
                    <?php endwhile; ?>
                </ul>
            </section>
        <?php endif; ?>
        
    <?php endif; ?>

<?php get_footer(); ?>

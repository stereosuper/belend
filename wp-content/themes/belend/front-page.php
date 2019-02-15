<?php get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <header class='hero'>
            <div class='banner-img' style='background-image: url(<?php echo get_the_post_thumbnail_url($post, 'full'); ?>)'></div>

            <div class='intro'>
                <div>
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

                <?php
                    $btn = get_field('btn');
                    if( $btn ) :
                ?>
                    <a class='btn' href='<?php echo $btn['url']; ?>' <?php if( $btn['target'] ) echo "target='_blank'"; ?>>
                        <?php echo $btn['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                    </a>
                <?php endif; ?>
            </div>

            <?php if( have_rows('benefits') ): ?>
                <ul class='benefits'>
                    <?php while ( have_rows('benefits') ) : the_row(); ?>
                        <li>
                            <span <?php if( get_sub_field('bold1') ) echo "class='bold' "; ?>><?php the_sub_field('text1'); ?></span>
                            <span <?php if( get_sub_field('bold2') ) echo "class='bold' "; ?>><?php the_sub_field('text2'); ?></span>
                        </li>
                    <?php endwhile; ?>
                </ul>
            <?php endif; ?>
        </header>

        <section>
            <?php $loc = get_field('localisation'); if( $loc ) : ?>
                <h2><?php echo $loc['locTitle']; ?></h2>
                <?php echo $loc['locText']; ?>
                <?php
                    $locLink = $loc['locLink'];
                    if( $locLink ) :
                ?>
                    <a href='<?php echo $locLink['url']; ?>' <?php if( $locLink['target'] ) echo "target='_blank'"; ?>>
                        <?php echo $locLink['title']; ?>
                    </a>
                <?php endif; ?>
            <?php endif; ?>

            <?php if( get_field('nbText') ) : ?>
                <h3><?php the_field('nbText'); ?></h3>
                <span><?php the_field('nb'); ?></span>
            <?php endif; ?>
        </section>
        
        <?php $quotes = get_field('quotes'); if( $quotes ) : ?>
            <section>
                <h2><?php echo $quotes['quotesTitle']; ?></h2>
                
                <?php if( $quotes['quotes'] ): ?>
                    <?php foreach( $quotes['quotes'] as $quote ) : ?>
                        <blockquote>
                            <?php echo $quote['quote']; ?>
                            <?php echo $quote['name']; ?>
                            <?php echo $quote['job']; ?>
                        </blockquote>
                    <?php endforeach; ?>
                <?php endif; ?>
            </section>
        <?php endif; ?>

        <section>
            <?php $pro = get_field('pro'); if( $pro ) : ?>
                <div>
                    <h2><?php echo $pro['proTitle']; ?></h2>
                    <?php echo $pro['proText']; ?>

                    <?php if( $pro['proBtn'] ) : ?>
                        <a class='btn' href='<?php echo $pro['proBtn']['url']; ?>' <?php if( $pro['proBtn']['target'] ) echo "target='_blank'"; ?>>
                            <?php echo $pro['proBtn']['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php $individual = get_field('individual'); if( $individual ) : ?>
                <div>
                    <h2><?php echo $individual['individualTitle']; ?></h2>
                    <?php echo $individual['individualText']; ?>

                    <?php if( $individual['individualBtn'] ) : ?>
                        <a class='btn' href='<?php echo $individual['individualBtn']['url']; ?>' <?php if( $individual['individualBtn']['target'] ) echo "target='_blank'"; ?>>
                            <?php echo $individual['individualBtn']['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </section>

        <?php if( have_rows('benefits2') ): ?>
            <section>
                <ul class='benefits'>
                    <?php while ( have_rows('benefits2') ) : the_row(); ?>
                        <li>
                            <h3><?php the_sub_field('title'); ?></h3>
                            <?php the_sub_field('text'); ?>
                        </li>
                    <?php endwhile; ?>
                </ul>
            </section>
        <?php endif; ?>
        
    <?php endif; ?>

<?php get_footer(); ?>

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
        
    <?php endif; ?>

<?php get_footer(); ?>

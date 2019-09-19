function animations(scene) {
    let config = {
        key: 'left',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/left',start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'leftStop',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/leftStop',start: 0, end: 0}),
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'rightStop',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/rightStop',start: 7, end: 7}),
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'right',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/right',start: 4, end: 7}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);
	

    config = {
        key: 'stand',
        frames: [{key: 'mouse', frame: 3}],
        frameRate: 0
    };
    scene.anims.create(config);

    config = {
        key: 'mouseClimb',
        frames: scene.anims.generateFrameNumbers('mouseClimb', {start: 0, end: 1}),
        frameRate: 6,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'scleft',
        frames: scene.anims.generateFrameNumbers('stupid_cat', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'scright',
        frames: scene.anims.generateFrameNumbers('stupid_cat', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'scclimb',
        frames: scene.anims.generateFrameNumbers('catClimb', {start: 0, end: 1}),
        frameRate: 6,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'cu_left',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/left',start: 8, end: 11}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'cu_leftStop',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/leftStop',start: 8, end: 8}),
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'cu_rightStop',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/rightStop',start: 15, end: 15}),
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'cu_right',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/right',start: 12, end: 15}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'cu_blink_left',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/left',start: 16, end: 19}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'cu_blink_leftStop',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/leftStop',start: 24, end: 27}),
        frameRate: 10,
        duration:20,
        repeat: 1
    };
    scene.anims.create(config);

    config = {
        key: 'cu_blink_rightStop',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/rightStop',start: 28, end: 31}),
        frameRate: 20,
        duration:20,
        repeat: 1
    };
    scene.anims.create(config);

    config = {
        key: 'cu_blink_right',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/right',start: 20, end: 23}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'mcleft',
        frames: scene.anims.generateFrameNumbers('maho_cat', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'mcright',
        frames: scene.anims.generateFrameNumbers('maho_cat', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'mcclimb',
        frames: scene.anims.generateFrameNumbers('mcCatClimb', {start: 0, end: 1}),
        frameRate: 6,
        repeat: -1
    };
    scene.anims.create(config);


}

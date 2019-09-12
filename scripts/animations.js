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
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/rightStop',start: 5, end: 5}),
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'right',
        frames: scene.anims.generateFrameNumbers('mouse', {prefix: 'walk/right',start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'stand',
        frames: [{key: 'mouse', frame: 4}],
        frameRate: 0
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
}

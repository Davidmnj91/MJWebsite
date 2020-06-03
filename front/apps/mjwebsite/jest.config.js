module.exports = {
  name: 'mjwebsite',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mjwebsite',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};

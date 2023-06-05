import { takeSnapshot } from 'testcafe-blink-diff'
const { Selector } = require('testcafe')
let testName = ''

fixture('FVSitePages').page('https://v2.dev.firstvoices.com/lilwat')
test('Site Homepage', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
})

test('Words', async (t) => {
  testName = t.testRun.test.name
  await t.expect(Selector('div h1').innerText).eql('WORDS').maximizeWindow()
  await takeSnapshot(t, testName, { fullPage: true, timeout: 5000 })
}).page('https://v2.dev.firstvoices.com/lilwat/words')

test('Phrases', async (t) => {
  testName = t.testRun.test.name
  await t.expect(Selector('div h1').innerText).eql('PHRASES').maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/phrases')

test('Alphabet', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/alphabet')

test('Categories', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/categories')

test('Songs', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/songs')

test('Stories', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/stories')

test('Games', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/games')

test('Apps', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/apps')

test('Keyboards', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/keyboards')

test('OurLanguage', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/our-language')

test('OurPeople', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/our-people')

test('Kids-Home', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow()
  await takeSnapshot(t, testName, {
    fullPage: true,
    timeout: 5000,
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat/kids')

test('Navbar-Dictionary', async (t) => {
  testName = t.testRun.test.name
  await t.maximizeWindow().click(Selector('#NavBarPresentationMenu').nth(0))
  await takeSnapshot(t, testName, {
    fullPage: false,
    timeout: 5000,
    Selector: Selector('#NavBarPresentationMenu').nth(0).child(),
    blockOut: Selector('div').withAttribute('data-testid', 'Home'),
    skipJsErrors: true,
  })
}).page('https://v2.dev.firstvoices.com/lilwat')

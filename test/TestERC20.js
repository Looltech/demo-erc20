//JavaScript 2015 // ES6
const ERC20 = artifacts.require('ERC20')

contract('ERC20', async accounts => {
  it('kiem tra moi truong', () => {
    assert.equal(3, 3, 'Moi truong khong dung')
  })

  it('kiem tra ham khoi tao dung', async () => {
    const totalSupply = 1000
    let instance = await ERC20.new(totalSupply)

    assert.equal(await instance.totalSupply(), totalSupply, 'khoi tao khong dung 1000')
    assert.equal(await instance.balanceOf(accounts[0]), 1000, 'khoi tao chu so huu sai')
  })

  it('kiem tra ham transfer', async () => {
    const totalSupply = 1000
    let instance = await ERC20.new(totalSupply)

    //const host = accounts[0]
    const a = accounts[1]
    const b = accounts[2]
    const c = accounts[3]

    instance.transfer(a, 20)
    instance.transfer(b, 10)
    instance.transfer(c, 5)

    assert.equal(await instance.balanceOf(a), 20, 'tai khoan A nen co 20')
    assert.equal(await instance.balanceOf(b), 10, 'tai khoan B nen co 10')
    assert.equal(await instance.balanceOf(c), 5, 'tai khoan C nen co 5')
    assert.equal(await instance.balanceOf(accounts[0]), 965, 'tai khoan HOST nen con 965')

    instance.transfer(b, 3, { from: a }) // A.transfer(B, 3)
    assert.equal(await instance.balanceOf(a), 17, 'tai khoan A nen co 17')
    assert.equal(await instance.balanceOf(b), 13, 'tai khoan B nen co 13')
    assert.equal(await instance.balanceOf(c), 5, 'tai khoan C nen co 5')
    assert.equal(await instance.balanceOf(accounts[0]), 965, 'tai khoan HOST nen con 965')
  })

  it('kiem tra ham transferFrom & approve', async () => {
    const totalSupply = 1000
    let instance = await ERC20.new(totalSupply)

    //const host = accounts[0]
    const a = accounts[1]
    const b = accounts[2]
    const c = accounts[3]

    instance.transfer(a, 20)
    instance.transfer(b, 10)
    instance.transfer(c, 5)

    instance.transfer(b, 3, { from: a })

    instance.approve(b, 7, { from: a }) //A.approval(B, 7)
    assert.equal(await instance.allowance(a, b), 7, 'A nen cho phep B tieu 7')

    instance.transferFrom(a, c, 5, { from: b }) //B.transferFrom(A, C, 5)
    assert.equal(await instance.allowance(a, b), 2, 'A nen cho phep B tieu 2')
    assert.equal(await instance.balanceOf(a), 12, 'A nen con 12')
    assert.equal(await instance.balanceOf(b), 13, 'B nen con 13')
    assert.equal(await instance.balanceOf(c), 10, 'C nen con 10')
  })
})

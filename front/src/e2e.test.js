describe("App.js", () => {
  it("the app has a Navigation menu", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".ant-empty-description");
    const text = await page.$eval(
      ".ant-empty-description",
      (e) => e.textContent
    );
    expect(text).toContain("Home");
  });

  it("check if users page works", async () => {
    await page.goto("http://localhost:3000/users");
    await page.waitForSelector(".ant-empty-description");
    const text = await page.$eval(
      ".ant-empty-description",
      (e) => e.textContent
    );
    expect(text).toContain("Users");
  });

  it("check if tasks page works", async () => {
    await page.goto("http://localhost:3000/tasks");
    await page.waitForSelector(".ant-empty-description");
    const text = await page.$eval(
      ".ant-empty-description",
      (e) => e.textContent
    );
    expect(text).toContain("Tasks");
  });
});

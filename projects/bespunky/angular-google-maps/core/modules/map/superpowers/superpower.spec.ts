import { MockSuperpower1, MockGoogleMap } from "@bespunky/angular-google-maps/core/testing";

describe('Superpower (abstract)', () =>
{
    const power = new MockSuperpower1();

    it('should attach to a map when calling `attach()` and allow reading it using `map`', () =>
    {
        expect(power.map).toBeUndefined();

        power.attach(new MockGoogleMap());

        expect(power.map).toBeDefined();
    });
});
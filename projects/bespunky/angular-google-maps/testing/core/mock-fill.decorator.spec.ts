import { Type } from '@angular/core';

export function MockFill(target: Type<any>)
{
    for (const name in target.prototype)
    {
        if (!target.prototype.hasOwnProperty(name)) continue;

        try
        {
            if (target.prototype[name] instanceof Function)
                target.prototype[name]();
        }
        catch (error)
        {
            if (!error.message.match(/not implemented/)) continue;

            target.prototype[name] = function()
            {
                console.log(`MockFill: ${target.name}.${name}() called. No action taken.`);
            };
        }
    }
}

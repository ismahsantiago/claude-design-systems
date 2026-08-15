import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Field,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
} from '../index';

/**
 * A realistic screen assembled only from library components — the reference
 * for how the pieces are meant to fit together.
 */
const meta = {
  title: 'Examples/Settings page',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const MEMBERS = [
  { name: 'Ada Lovelace', email: 'ada@acme.com', role: 'Owner' },
  { name: 'Grace Hopper', email: 'grace@acme.com', role: 'Admin' },
  { name: 'Alan Turing', email: 'alan@acme.com', role: 'Member' },
];

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [publicWorkspace, setPublicWorkspace] = useState(false);

    return (
      <Stack gap="xl" padding="2xl" style={{ maxWidth: 720, margin: '0 auto' }}>
        <Stack gap="xs">
          <Heading level={1}>Workspace settings</Heading>
          <Text tone="muted">Manage how Acme Inc. works for everyone on the team.</Text>
        </Stack>

        <Alert tone="warning" title="Approaching your seat limit">
          8 of 10 seats are in use. Add seats before inviting anyone else.
        </Alert>

        <Card title="General" subtitle="Basic details for this workspace">
          <Stack gap="lg">
            <Field label="Workspace name" hint="Shown to everyone you invite." required>
              <Input defaultValue="Acme Inc." />
            </Field>
            <Field label="Region" hint="Data never leaves the selected region.">
              <Select defaultValue="eu-central">
                <option value="us-east">US East</option>
                <option value="us-west">US West</option>
                <option value="eu-central">EU Central</option>
                <option value="ap-south">AP South</option>
              </Select>
            </Field>
            <Field label="Description">
              <Textarea rows={3} placeholder="What does this team work on?" />
            </Field>
          </Stack>
        </Card>

        <Card
          title="Members"
          subtitle="People with access to this workspace"
          action={
            <Button size="sm" variant="secondary">
              Invite
            </Button>
          }
          footer={
            <Stack direction="row" justify="between" align="center">
              <Text size="sm" tone="muted">
                8 of 10 seats used
              </Text>
              <Button size="sm" variant="ghost">
                Manage seats
              </Button>
            </Stack>
          }
        >
          <Stack gap="none">
            {MEMBERS.map((member, index) => (
              <Stack key={member.email} gap="none">
                {index > 0 && <Divider spacing="md" />}
                <Stack direction="row" gap="md" align="center" justify="between">
                  <Stack direction="row" gap="md" align="center">
                    <Avatar name={member.name} />
                    <Stack gap="2xs">
                      <Text weight="medium">{member.name}</Text>
                      <Text size="sm" tone="muted">
                        {member.email}
                      </Text>
                    </Stack>
                  </Stack>
                  <Badge tone={member.role === 'Owner' ? 'accent' : 'neutral'}>{member.role}</Badge>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card>

        <Card title="Privacy" subtitle="Who can see this workspace">
          <Stack gap="lg">
            <Switch
              label="Public workspace"
              description="Anyone with the link can view. Editing still requires an invite."
              checked={publicWorkspace}
              onCheckedChange={setPublicWorkspace}
            />
            <Divider />
            <Stack gap="md">
              <Checkbox
                label="Enable audit logging"
                description="Records every write to your workspace."
                defaultChecked
              />
              <Checkbox
                label="Require two-factor authentication"
                description="Applies to all members on their next sign-in."
              />
            </Stack>
          </Stack>
        </Card>

        <Stack direction="row" gap="sm" justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button>Save changes</Button>
        </Stack>
      </Stack>
    );
  },
};
